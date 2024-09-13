
import { IconType } from "react-icons";
import { SiNeteasecloudmusic } from "react-icons/si";
import { RiHome2Fill } from "react-icons/ri";
import { IoMusicalNotes } from "react-icons/io5";
import { RiPlayListFill } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { VscAccount } from "react-icons/vsc";


interface NavigateItem {
    link: string;
    icon: IconType;
}

const NAV_BAR_CONFIG: NavigateItem[] = [
    {
        icon: SiNeteasecloudmusic,
        link: '/',
    },
    {
        icon: RiHome2Fill,
        link: '/',
    },
    {
        icon: IoMusicalNotes,
        link: '/songs',
    },
    {
        icon: RiPlayListFill,
        link: '/playlists',
    },
    {
        icon: GrFavorite,
        link: '/favorites',
    },
    {
        icon: VscAccount,
        link: '/account',
    },
]

export default NAV_BAR_CONFIG
