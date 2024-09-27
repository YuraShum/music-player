import songApi from '@/api/requests/song.requests';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
    onCretedNewSong: () => void,
    setCreateFromIsOpen: (value: boolean) => void
};

interface DownloadSongsParams {
    title: string;
    artist: string;
    mp3: FileList;
    cover?: FileList;
}

const DownLoadSongForm = ({onCretedNewSong, setCreateFromIsOpen}: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<DownloadSongsParams>();

    const submitDownloadedSong: SubmitHandler<DownloadSongsParams> = async (values: DownloadSongsParams) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('artist', values.artist);

        const musicFile:  File | Blob = values.mp3[0]
        if (musicFile) {
            formData.append('mp3', musicFile);
        } else {
            toast.error('Необхідно завантажити файл пісні mp3');
            return;
        }
        if (values.cover) {
            formData.append('cover', values.cover[0]);
        }

        try {
            const { response, error } = await songApi.addSong(formData);

            if (response) {
                toast.success('Пісня завантажена успішно.');
                reset();
                setCreateFromIsOpen(false)
                onCretedNewSong()
                
            }
            if (error) {
                console.log(error);
                toast.error('Сталася помилка при завантаженні пісні.');
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            toast.error('Сталася неочікувана помилка.');
        }
    };
    return (
        <form onSubmit={handleSubmit(submitDownloadedSong)} className="flex flex-col gap-4 p-6 max-w-[600px]">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Song title *</label>
                <input
                    type="text"
                    placeholder="title"
                    {...register('title', { required: true })}
                    className="bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm -mt-1 pl-3">Поле обов'язкове.</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Artist *</label>
                <input
                    type="text"
                    placeholder="artist"
                    {...register('artist', { required: true })}
                    className="bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg"
                />
                {errors.artist && (
                    <p className="text-red-500 text-sm -mt-1 pl-3">Поле обов'язкове.</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Music file *</label>
                <input
                    type="file"
                    accept=".mp3"
                    placeholder="select a music file"
                    {...register('mp3', {
                        required: true,
                        validate: (fileList) => {
                            const file = fileList?.[0];
                            return file.type === 'audio/mpeg' || 'Формат файлу має бути MP3.';
                        },
                    })}
                    className="bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg"
                />
                {errors.mp3 && (
                    <p className="text-red-500 text-sm -mt-1 pl-3">{errors.mp3.message || 'Поле обов\'язкове.'}</p>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Cover of the song *</label>
                <input
                    type="file"
                    placeholder="select a cover file"
                    {...register('cover')}
                    className="bg-gray-100 p-3 text-sm border-gray-300 border-2 rounded-lg"
                />
                {errors.cover && (
                    <p className="text-red-500 text-sm -mt-1 pl-3">Поле обов'язкове.</p>
                )}
            </div>
            <button type="submit" className="bg-primary text-white p-3 rounded-lg hover:bg-hovered duration-500 hover:translate-y-[-2px]">
                Upload Song
            </button>
        </form>
    );
};

export default DownLoadSongForm;
