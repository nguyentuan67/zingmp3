import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { musicOfPage, playMusic } from '~/redux/actions';
import styles from './TopMusic.module.scss';

const cx = classNames.bind(styles);

const TopMusic = (props) => {
    const data = props.data.items.slice(0, 5);
    const dispatch = useDispatch();

    const handleMusic = (item) => {
        dispatch(playMusic(item));
        dispatch(musicOfPage(props.data.items));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h2>{props.country}</h2>
                <i className='fas fa-play'></i>
            </div>

            {data.map((item, index) => (
                <div className={cx('container')} key={index}>
                    <div className={cx('music-rank')}>
                        <span className={cx('num')}>{index + 1}</span>
                        <span className={cx('line')}></span>
                        <img
                            src={item.thumbnail || item.thumbnailM}
                            alt={item.title}
                        />
                        <i
                            className='fas fa-play'
                            onClick={() => handleMusic(item)}
                        ></i>
                        <div className={cx('music-details')}>
                            <p>{item.title}</p>
                            <a>{item.artistsNames}</a>
                        </div>
                    </div>
                    <div className={cx('music-hover')}>
                        <div className={cx('music-hover-icon')}>
                            <span>
                                <i className='far fa-microphone'></i>
                            </span>
                            <span>...</span>
                        </div>
                        <p>05:03</p>
                    </div>
                </div>
            ))}

            <div className={cx('all-items')}>
                <Link to={props.to}>Xem tất cả</Link>
            </div>
        </div>
    );
};

export default TopMusic;
