import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Webcam from 'react-webcam';
import { DialogTitle } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Capture: React.FunctionComponent<{
  submitting: boolean;
  setData1: (data: any) => void;
  setData2: (data: any) => void;
  setData3: (data: any) => void;
  setData4: (data: any) => void;
}> = ({ setData1, setData2, setData3, setData4, submitting }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [devicesToCapture, setDevicesToCapture] = React.useState<number[]>([]);
  // eslint-disable-next-line prefer-const
  let mediaRefs = React.useRef<any>([]);

  mediaRefs.current = [0, 0, 0, 0].map(
    (_, index) => (mediaRefs.current[index] = React.createRef())
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCapture = (_: any, index: number) => {
    mediaRefs.current[index].current.getScreenshot().then((data: any) => {
      switch (index) {
        case 0:
          setData1(data);
          break;
        case 1:
          setData2(data);
          break;
        case 2:
          setData3(data);
          break;
        case 3:
          setData4(data);
          break;
      }
    });
  };
  return (
    <>
      <Button
        disabled={submitting}
        sx={{
          margin: 2,
          width: '90%',
        }}
        onClick={async () => {
          await navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(async (stream) => {
              await navigator.mediaDevices
                .enumerateDevices()
                .then((devices) => {
                  if (devices.length < 4) {
                    alert('at least 4 cameras are required');
                  } else {
                    const dev = devices.filter((d) => d.kind === 'videoinput');
                    console.log(dev);
                    setDevices(dev);
                    handleClickOpen();
                  }
                });
            });
        }}
        variant="outlined"
        size="small"
      >
        capture
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xl"
        onClose={handleClose}
      >
        <DialogTitle>select any four images</DialogTitle>
        <DialogContent>
          {devices.length > 0 &&
            devices.map((d, i) => (
              <Webcam
                audio={false}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  devicesToCapture.includes(i)
                    ? setDevicesToCapture(
                        devicesToCapture.filter((x) => x !== i)
                      )
                    : devicesToCapture.length >= 4
                    ? null
                    : setDevicesToCapture([...devicesToCapture, i]);
                }}
                style={{
                  border: devicesToCapture.includes(i) ? '4px solid red' : '',
                  padding: '10px',
                  margin: '3px',
                }}
                key={d.deviceId}
                videoConstraints={{
                  aspectRatio: 1,
                  deviceId: {
                    exact: d.deviceId,
                  },
                }}
                height={340}
                ref={mediaRefs.current[i]}
                screenshotFormat="image/jpeg"
                width={340}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button
            style={{
              display: devicesToCapture.length >= 4 ? 'flex' : 'none',
            }}
            onClick={async () => {
              await Promise.all(
                devicesToCapture.map((i) =>
                  mediaRefs.current[i].current.getScreenshot()
                )
              ).then((data) => {
                setData1(data[0]);
                setData2(data[1]);
                setData3(data[2]);
                setData4(data[3]);
                setDevicesToCapture([]);
                handleClose();
              });
            }}
            variant="contained"
            color="primary"
          >
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Capture;
