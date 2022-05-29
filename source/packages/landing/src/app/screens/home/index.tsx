import { FunctionComponent } from 'react';
import CustomerReview from '../../components/customerReview';
import Nav from '../../components/navBar';
import styles from './home.module.scss';

const Home: FunctionComponent = () => {
  return (
    <>
      <div className={styles['homeContainer']}>
        <Nav />
        <section className={styles['HeroSection']}>
          <div>
            <h1>
              Bring the<span> power of automation </span>to your weighbridges.
            </h1>
          </div>
          <div></div>
        </section>
        <section className={styles['HeroSection']}>
          <div>
            <h1>
              <span>simplify the weighing process</span> and make it fast and
              efficient .
            </h1>
          </div>
          <div></div>
        </section>
        <section className={styles['HeroSection']}>
          <div>
            <h1>
              manage the pending bills <span>paid in time.</span>
            </h1>
          </div>
        </section>
        <section className={styles['HeroSection']}>
          <div>
            <h1>
              <span> secure your weighbridge</span> from fraudulence with our
              technology
              <div></div>
            </h1>
          </div>
          <div></div>
        </section>
        <section className={styles['HeroSection']}>
          <div>
            <h1>
              give your clients{' '}
              <span> a dashboard for managing the bills </span>
              and dues with your weighbridge.
            </h1>
          </div>
          <div></div>
        </section>
      </div>
      <CustomerReview />
    </>
  );
};

export default Home;
