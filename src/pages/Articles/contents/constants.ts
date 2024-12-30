import mySampleHistory from './my-sample-history.md'
import BLOG1735226112436 from './1735226112436.md'
import SampleHistoryCover from '@/assets/covers/widget.png'
import BLOG142629841 from '@/assets/covers/csdnCover/142629841.webp'
import BLOG142549929 from '@/assets/covers/csdnCover/142549929.png'
import BLOG140183104 from '@/assets/covers/csdnCover/140183104.png'
import BLOG139174706 from '@/assets/covers/csdnCover/139174706.png'
import BLOG138307880 from '@/assets/covers/csdnCover/138307880.png'
import BLOG135521592 from '@/assets/covers/csdnCover/135521592.png'
import BLOG135356798 from '@/assets/covers/csdnCover/135356798.png'

export default {
    'my-sample-history': {
        key: 'my-sample-history',
        title: '如何自己实现一个history?',
        cover: SampleHistoryCover,
        content: mySampleHistory
    },
    '1735226112436': {
        key: 1735226112436,
        title: '关于手写promise的一点补充',
        cover: BLOG142629841,
        content: BLOG1735226112436
    }
} as unknown as Record<string, {
    key: string,
    title: string,
    cover?: string,
    content: any
}>


export const CSDNArticles = [
    {
        id: 142629841,
        title: '填坑，从零带你手写Promise (typescript)',
        url: 'https://blog.csdn.net/weixin_40710412/article/details/142629841?spm=1001.2014.3001.5502',
        cover: BLOG142629841
    },
    {
        id:142549929,
        title: '从异步传染浅谈代数效应',
        url: 'https://blog.csdn.net/weixin_40710412/article/details/142549929?spm=1001.2014.3001.5501',
        cover: BLOG142549929
    },
    {
        id: 140183104,
        title: '简单聊聊宏任务和微任务',
        url: 'https://blog.csdn.net/weixin_40710412/article/details/140183104?spm=1001.2014.3001.5501',
        cover: BLOG140183104
    },
    {
        id:139174706,
        title: '聊一下浮动',
        url: 'https://blog.csdn.net/weixin_40710412/article/details/139174706?spm=1001.2014.3001.5501',
        cover: BLOG139174706
    },
    {
        id: 138307880,
        title:'浅谈line-height&vertical-align',
        url: 'https://blog.csdn.net/weixin_40710412/article/details/138307880?spm=1001.2014.3001.5501',
        cover: BLOG138307880
    },
    {
        id: 135521592,
        title: 'Javascript执行&作用域全面总结',
        url: 'https://blog.csdn.net/weixin_40710412/article/details/135521592?spm=1001.2014.3001.5501',
        cover: BLOG135521592
    },
    {
        id: 135356798,
        title: '浏览器原理全面总结',
        url: 'https://blog.csdn.net/weixin_40710412/article/details/135356798?spm=1001.2014.3001.5501',
        cover: BLOG135356798
    }
] as {
    id: string | number,
    title: string,
    url: string,
    cover: string
}[]