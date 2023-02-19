import { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';

import Button from '~/component/Button';
import { MessageIcon, UploadIcon } from '~/component/Icons';
import Image from '~/component/Image';
import Search from '../Search';
import Menu from '~/component/Popper/Menu';
import config from '~/config';
import styles from './Header.module.scss';
import UserContext from '~/component/Contexts/UserContext/UserContext';
import useModalAuthContext from '~/component/Contexts/useModalAuthContext';
import images from '~/asset/images';

const cx = className.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'keyboard shortcuts',
    },
];
const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'View profile',
        to: '/@profile',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Get Coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Setting',
        to: '/setting',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header({ small }) {
    const user = UserContext();
    const { setIsModalAuth } = useModalAuthContext();
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        !!user ? setDataUser(user) : setDataUser({});
    }, [user]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
        switch (menuItem.type) {
            case '/language':
                // Handle change language
                console.log(123);
                break;
            default:
        }
        switch (menuItem.to) {
            case '/logout':
                handleLogout();
                console.log(123);
                break;
            case '/@profile':
                window.location.pathname = `@${user.nickname}`;
                break;

            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner', small && 'small')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <Image src={images.logo} alt="logo-tiktok" />
                    </Link>
                </div>

                <Search />
                <div className={cx('actions')}>
                    <>
                        <Link to={!!user && config.routes.upload}>
                            <Button normal className={cx('plus-upload')} onClick={() => !user && setIsModalAuth(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                                <b> Up Load</b>
                            </Button>
                        </Link>
                        {!!user ? (
                            <>
                                <Tippy content="Message" placement="bottom" delay={[0, 200]}>
                                    <button className={cx('btn-actions')}>
                                        <UploadIcon />
                                    </button>
                                </Tippy>
                                <Tippy content="Box" placement="bottom" delay={[0, 200]}>
                                    <button className={cx('btn-actions')}>
                                        <span className={cx('notify')}>12</span>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <Button primary onClick={() => setIsModalAuth(true)}>
                                <b> Log in</b>
                            </Button>
                        )}
                    </>

                    <Menu
                        items={!!user ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                        delay={[0, 700]}
                        offset={[12, 8]}
                        placement="bottom-end"
                    >
                        {!!user ? (
                            <Image className={cx('user-avatar')} src={dataUser.avatar} alt="avatar" />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
