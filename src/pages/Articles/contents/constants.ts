import mySampleHistory from './my-sample-history.md'
import SampleHistoryCover from '@/assets/covers/widget.png'

export default {
    'my-sample-history': {
        key: 'my-sample-history',
        title: '如何自己实现一个history?',
        cover: SampleHistoryCover,
        content: mySampleHistory
    }
} as unknown as Record<string, {
    key: string,
    title: string,
    cover?: string,
    content: any
}>