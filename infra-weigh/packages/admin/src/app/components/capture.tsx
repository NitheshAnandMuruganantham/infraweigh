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
  const componentRef1 = React.useRef<Webcam>(null);
  const componentRef2 = React.useRef<Webcam>(null);
  const componentRef3 = React.useRef<Webcam>(null);
  const componentRef4 = React.useRef<Webcam>(null);
  const componentRef: any[] = [
    componentRef1,
    componentRef2,
    componentRef3,
    componentRef4,
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [devicesToCapture, setDevicesToCapture] = React.useState<number[]>([]);

  return (
    <>
      <Button
        disabled={submitting}
        sx={{
          margin: 2,
          width: '90%',
        }}
        onClick={async () => {
          navigator.mediaDevices.enumerateDevices().then((devices) => {
            const dev = devices.filter((d) => d.kind === 'videoinput');
            setDevices(dev);
          });
          handleClickOpen();
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
          {devices.map((d, i) => (
            <Webcam
              audio={false}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                devicesToCapture.includes(i)
                  ? setDevicesToCapture(devicesToCapture.filter((x) => x !== i))
                  : devicesToCapture.length >= 4
                  ? null
                  : setDevicesToCapture([...devicesToCapture, i]);
              }}
              style={{
                border: devicesToCapture.includes(i) ? '4px solid red' : '',
                padding: '10px',
                margin: '3px',
              }}
              key={i}
              videoConstraints={{
                aspectRatio: 1,
                deviceId: {
                  exact: d.deviceId,
                },
              }}
              height={340}
              ref={componentRef[i]}
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
              console.log(
                'image_1',
                componentRef1.current?.getScreenshot()?.toString()
              );
              console.log(
                'image_2',
                componentRef2.current?.getScreenshot()?.toString()
              );
              console.log(
                'image_3',
                componentRef3.current?.getScreenshot()?.toString()
              );
              console.log(
                'image_4',
                componentRef4.current?.getScreenshot()?.toString()
              );

              setData1(componentRef1.current?.getScreenshot()?.toString());
              setData2(componentRef2.current?.getScreenshot()?.toString());
              setData3(componentRef3.current?.getScreenshot()?.toString());
              setData4(componentRef4.current?.getScreenshot()?.toString());
              setDevicesToCapture([]);
              handleClose();
            }}
          >
            capture
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Capture;
