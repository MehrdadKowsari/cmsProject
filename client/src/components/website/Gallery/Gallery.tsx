import React from 'react';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { GalleryFileDTO } from 'src/models/contentManagement/galleryFile/galleryFileDTO';
import GalleryCard from '../GalleryCard/GalleryCard';

interface Props {
    items: GalleryFileDTO[]
}
const MediaGallery: React.FC<Props> = ({items}) => {
    const onInit = () => {
        
    };
    return (
        <div className="App" style={{direction: "ltr"}}>
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                {items && items?.filter(p => p.file !== null).map((p : GalleryFileDTO) => (
                   <GalleryCard
                    title={p.name || ''}
                    href={p.file!} 
                    imageSrc={p.file!}
                    imageAlt={p.name}
                   />
                                             
                ))
                }
                
            </LightGallery>
        </div>
    );
}
export default MediaGallery;