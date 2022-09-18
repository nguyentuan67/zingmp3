import React from 'react'
import classNames from 'classnames/bind';
import styles from './US-UK.module.scss';

import Left from './Left';
import Right from './Right';
import Content from './Content';

const cx = classNames.bind(styles);

function MVUS() {
  return (
    <div className={cx('container')}>

      <div className={cx('search-nav')}>
        <Left/>
        <Right/>
      </div>

      <div className={cx('columns', 'is-multiline')}>       
        <Content/>
      </div>



    </div>
  )
}

export default MVUS