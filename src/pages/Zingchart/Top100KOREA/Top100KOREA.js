import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Loading from '../Loading/Loading';
import MusicItem from '~/components/MusicItem';
import styles from './Top100KOREA.module.scss';
import { useDispatch } from 'react-redux';
import { musicOfPage } from '~/redux/actions';

const cx = classNames.bind(styles);

const Top100KOREA = () => {
    const [music, setMusic] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios
                .get(`https://apizingmp3.herokuapp.com/api/charthome`)
                .then((res) => res.data.data);
            setMusic(data);
        };
        fetchData();

        document.title =
            '#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại';
    }, []);
    return (
        <div className={cx('wrapper')}>
            {music.weekChart ? (
                music.weekChart.korea.items.map((item, index) => (
                    <LazyLoadComponent key={index}>
                        <MusicItem
                        song={item}
                            number={index + 1}
                            title={item.title}
                            name={item.album ? item.album.title : ''}
                            artistsNames={item.artistsNames}
                            thumbnail={item.thumbnail || item.thumbnailM}
                            listMusicOfPage={() =>
                                dispatch(musicOfPage(music.weekChart.korea.items))
                            }
                        />
                    </LazyLoadComponent>
                ))
            ) : (
                <div>
                    <Loading />
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Top100KOREA;
