import * as React from 'react';
import styles from './customerReview.module.scss';

const CustomerReview: React.FunctionComponent = () => {
  return (
    <section className={styles['CustomerReviewContainer']}>
      <h1>our client review</h1>
      <div className={styles['cardHolder']}>
        <span>
          <div>
            <div className={styles['avatar']} />
            <div className={styles['avatarName']}>
              Anand Weighbridges
              <div className={styles['avatarNameDesignation']}>
                Managing director
              </div>
            </div>
          </div>
          <div>this software reduces our manual work by 80%</div>
        </span>
      </div>
    </section>
  );
};

export default CustomerReview;
