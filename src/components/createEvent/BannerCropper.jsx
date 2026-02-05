import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const BannerCropper = ({ file, onDone, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState(null);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedPixels(pixels);
  }, []);

  const createCroppedImage = async () => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    await new Promise((res) => (image.onload = res));

    const canvas = document.createElement("canvas");
    canvas.width = croppedPixels.width;
    canvas.height = croppedPixels.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      croppedPixels.x,
      croppedPixels.y,
      croppedPixels.width,
      croppedPixels.height,
      0,
      0,
      croppedPixels.width,
      croppedPixels.height,
    );

    canvas.toBlob((blob) => {
      onDone(new File([blob], file.name, { type: file.type }));
    }, file.type);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative h-[400px] bg-black">
          <Cropper
            image={URL.createObjectURL(file)}
            crop={crop}
            zoom={zoom}
            aspect={12 / 5}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button onClick={createCroppedImage} className="btn-primary">
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

BannerCropper.propTypes = {
  file: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BannerCropper;
