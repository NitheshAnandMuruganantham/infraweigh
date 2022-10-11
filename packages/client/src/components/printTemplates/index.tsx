import './printTemplate.scss';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Chip } from '@mui/material';
import QRCode from 'react-qr-code';

function truncateString(str: string, num: number) {
  if (typeof str === 'string') {
    if (str.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  } else {
    return '';
  }
}

const Bill: React.FunctionComponent<{
  data: any;
}> = (props) => {
  return (
    <div className="printBody">
      <div className="printHeader">
        <div
          style={{
            textAlign: 'center',
            fontSize: '40px',
            fontWeight: 'bold',
          }}
        >
          {props.data?.weighbridge?.display_name}
        </div>
        <div
          style={{
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            borderTop: '2px solid white',
          }}
        />
        <div className="addressBar">{props.data?.weighbridge?.address}</div>
        <div className="contactBar">
          <div className="cotantBarItem">
            <LocalPhoneIcon />
            <span className="contactText">
              {props.data?.weighbridge?.phone}
            </span>
          </div>
          <div className="cotantBarItem">
            <EmailIcon />
            <span className="contactText">{props.data?.weighbridge?.mail}</span>
          </div>
        </div>
        <div className="dateTimeHeader">
          <div>
            DATE TIME :{' '}
            {new Date(props.data.created_at).toLocaleDateString('en-GB') +
              ' ' +
              new Date(props.data.created_at).toLocaleTimeString()}
          </div>
          <div>BILL ID : {props?.data?.nano_id}</div>
        </div>
        <table className="primaryTable">
          <thead>
            <tr>
              <th>VEHICLE NUMBER</th>
              <th>MATERIAL</th>
              <th>CUSTOMER</th>
              <th>VEHICLE</th>
              <th>COTNAINER NO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.data.vehicle_number}</td>
              <td> {truncateString(props.data.material.name, 6)}</td>
              <td>
                {truncateString(
                  props.data.customer_bill_customer_idTocustomer
                    ?.company_name ||
                    props.data.customer_bill_customer_3_idTocustomer
                      ?.company_name ||
                    props.data.customer_bill_customer_2_idTocustomer
                      ?.company_name,
                  15
                )}
              </td>
              <td> {truncateString(props.data.vehicle.name, 8)}</td>
              <td>{props?.data?.box_number}</td>
            </tr>
          </tbody>
        </table>
        <table style={{ marginTop: '20px' }} className="primaryTable">
          <thead>
            <tr>
              <th>SCALE WEIGHT</th>
              <th>TARE WEIGHT</th>
              <th>NET WEIGHT</th>
              <th>CHARGES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.data.scale_weight} kg</td>
              <td>
                {props.data.second_weight ? props.data.tare_weight : ''} kg
              </td>
              <td>
                {props.data.second_weight
                  ? Math.abs(
                      props.data.scale_weight - props.data.tare_weight
                    ) || ''
                  : ''}{' '}
                kg
              </td>
              <td>₹ {props.data.charges}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '160px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {props?.data?.photos &&
            props.data.photos.map((photo: string, index: number) => {
              if (index > 3) {
                return null;
              } else
                return (
                  <img
                    key={index}
                    src={photo}
                    alt=""
                    style={{
                      width: '135px',
                      height: '135px',
                    }}
                  />
                );
            })}
          <div
            style={{
              height: '135px',
              width: '135px',
            }}
          >
            <QRCode
              size={135}
              value={'https://server.infraweigh.co/bill/slip/' + props.data.id}
            />
          </div>
        </div>
      </div>
      <div className="PrintFooter">
        <span className="footerDisclimer">check the weight before leaving</span>
        <Chip
          label="infra weigh secure"
          size="small"
          icon={<VerifiedUserOutlinedIcon />}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Bill;
