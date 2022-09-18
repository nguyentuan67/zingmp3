import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";

import styles from './Playlist.module.scss';
import Icon from "~/components/Icon";
import Image from '~/components/Image'
import images from "~/images";
import HeartIcon from "../Icon/Heart";

const cx = classNames.bind(styles)

function Playlist({
    className,
    name,
    describe,
    link,
    image,
    data,
}) {

    return ( 
        <div className={cx('wrapper', {[className]: className})}>
            <div className={cx('card')}>
                <a className={cx('card-link')} href={link} title={name}>
                    <div className={cx('over-lay')}></div>
                    <Image 
                        className={cx('card-image')}
                        src={image}
                        alt={name}
                        defaultAvt={images.defaultAvataAlbum}
                    />   
                    <div className={cx('card-actions')}>
                        <HeartIcon data={data} library={'libraryPlaylist'}/>
                        <Icon 
                            s18
                            className={cx('icon-play')}
                            icon={<i className="fas fa-play"></i>}
                        />
                        <Tippy content='Khác'>
                            <div>
                                <Icon icon={<i className="far fa-ellipsis-h"></i>} />
                            </div>
                        </Tippy>
                    </div>
                </a>        
            </div>
            <div className={cx('content')}>
                <a href={link} title={name} className={cx('title')}>{name}</a>
                <p className={cx('subtitle')}>{describe}</p>
            </div>
        </div>
     );
}

export default Playlist;