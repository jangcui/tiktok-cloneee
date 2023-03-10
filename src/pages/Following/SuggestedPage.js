import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BtnToggleFollow from '~/component/BtnToggleFollow';
import UserContext from '~/component/Contexts/UserContext';
import { CheckIcon } from '~/component/Icons';
import Loading from '~/component/Loading';
import { useDebounce } from '~/hook';
import * as Services from '~/Services/Services';
import styles from './Following.module.scss';
const cx = classNames.bind(styles);

const RANDOM = () => Math.floor(Math.random() * 20 + 1);
function SuggestedPage() {
    const { currentUser } = UserContext();

    const [page, setPage] = useState(RANDOM);
    const [dataUser, setDataUser] = useState([]);
    const deBoundUser = useDebounce(dataUser, 1000);
    const handleNextRender = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        if (page > 20) {
            return setPage(RANDOM);
        }
        if (!currentUser) {
            Services.getSuggested({ page: page, perPage: 12 }).then((data) => {
                setDataUser((preUser) => {
                    return [...preUser, ...data];
                });
            });
        }
    }, [page, currentUser]);
    return (
        <>
            <InfiniteScroll
                dataLength={deBoundUser.length}
                next={handleNextRender}
                hasMore={true}
                loader={
                    <div className={cx('loading')}>
                        <Loading />
                    </div>
                }
            >
                <div className={cx('container')}>
                    {deBoundUser.map(
                        (user, index) =>
                            !user.is_followed && (
                                <div className={cx('content')} key={index}>
                                    <video
                                        className={cx('video')}
                                        src={user.popular_video.file_url}
                                        onMouseOver={(e) => e.target.play()}
                                        loop
                                        onMouseOut={(e) => e.target.pause()}
                                        muted
                                    />
                                    <div className={cx('user')}>
                                        <h5>{user.first_name + ' ' + user.last_name} </h5>
                                        <span>
                                            {user.nickname} {user.is_followed && <CheckIcon className={cx('tick')} />}
                                        </span>
                                        <div className={cx('btn')}>
                                            <BtnToggleFollow dataUser={user} />
                                        </div>
                                    </div>
                                </div>
                            ),
                    )}
                </div>
            </InfiniteScroll>
        </>
    );
}

export default SuggestedPage;
