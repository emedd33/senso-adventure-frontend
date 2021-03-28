import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import React, { useMemo, useState } from "react";
import { storage } from "../../services/Firebase/firebase";
import ImageUploader from "react-images-upload";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants";
import { useTranslation } from "react-i18next";
type SensoImageInputProps = {
  storagePath: string;
  style?: React.CSSProperties;
};

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "1rem",
    padding: "0.5rem",
  },
  media: {
    height: "10rem",
    width: "10rem",
  },
});
const SensoImageInput: React.FC<SensoImageInputProps> = ({
  storagePath,
  style,
}) => {
  const classes = useStyles();
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [ImageUploaderKey, setImageUploaderKey] = useState(0);
  const [newLocationImages, setNewLocationImages] = useState<any[]>([]);
  const [existingLocationImages, setExistingLocationImages] = useState<any[]>(
    []
  );
  const translate = useTranslation();
  useMemo(() => {
    storage
      .ref(storagePath)
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          let name = itemRef.name;
          itemRef
            .getDownloadURL()
            .then((url) => {
              setExistingLocationImages((images) => {
                if (!images.map((img) => img.name).includes(name)) {
                  return [...images, { url: url, name: name }];
                }
                return images;
              });
            })
            .catch((e) => console.log("Could not connect to firebase"));
        });
      })
      .catch((error) => {
        console.log("Error fetching location images");
      });

    return () => {
      setNewLocationImages([]);
      setExistingLocationImages([]);
    };
  }, [storagePath]);
  const submitImages = async () => {
    setIsUploadingImages(true);
    await Promise.all(
      newLocationImages.map((newImage) => {
        let uploadTask = storage
          .ref(storagePath)
          .child(newImage.name)
          .put(newImage);
        return uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.log(`Could not upload ${newImage.name}`, error);
          },
          () => {
            let name = uploadTask.snapshot.ref.name;
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              setExistingLocationImages((images) => [
                ...images,
                { name: name, url: downloadURL },
              ]);
              return downloadURL;
            });
          }
        );
      })
    ).then(() => {
      setNewLocationImages([]);
      setImageUploaderKey(ImageUploaderKey + 1);
      setIsUploadingImages(false);
    });
  };
  const removeImage = (deleteImage: any) => {
    storage
      .ref(storagePath)
      .child(deleteImage.name)
      .delete()
      .then(() =>
        setExistingLocationImages(
          existingLocationImages.filter(
            (existingImg) => existingImg !== deleteImage
          )
        )
      )
      .catch((e) => console.log("Could not remove image file", e));
  };

  return (
    <Container style={style}>
      <ImageUploader
        key={ImageUploaderKey}
        withIcon={true}
        fileContainerStyle={{ backgroundColor: OLD_WHITE_DARK }}
        label={`${translate.t("Max file size")}: 10mb ${translate.t(
          "accepts"
        )}: jpg|gif|png`}
        buttonText={translate.t("Choose image")}
        onChange={(newImages: any) =>
          setNewLocationImages([...newLocationImages, ...newImages])
        }
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={10485760}
        withPreview={true}
        buttonStyles={{ backgroundColor: "#3F51B5" }}
      />
      {isUploadingImages ? (
        <CircularProgress />
      ) : newLocationImages.length > 0 ? (
        <Button variant="contained" onClick={submitImages} color="primary">
          {translate.t("Upload image")}
        </Button>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        {existingLocationImages.map((img, index) => {
          return (
            <Card className={classes.root} key={index}>
              <CardActionArea>
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "2rem",
                  }}
                  onClick={() => removeImage(img)}
                >
                  <ClearIcon color="secondary" />
                </CardActions>
                <CardMedia className={classes.media} image={img.url} />
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  gridtemplaterows: 1fr 1fr;
  alignitems: center;
`;

export default SensoImageInput;
