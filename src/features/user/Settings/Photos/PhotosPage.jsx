import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Segment, Header, Divider, Grid, Button } from "semantic-ui-react";
import CropperInput from "./CropperInput";
import DropzoneInput from "./DropzoneInput";
import {
  uploadProfileImage,
  deletePhoto,
  setProfilePhoto,
} from "../../userActions";
import { toastr } from "react-redux-toastr";
import UserPhotos from "./UserPhotos";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos",
    },
  ];
};
const mapStateToDispatch = {
  uploadProfileImage,
  deletePhoto,
  setProfilePhoto,
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading,
});

const PhotosPage = ({
  uploadProfileImage,
  deletePhoto,
  setProfilePhoto,
  photos,
  profile,
  loading,
}) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      handleCancelCrop();
      toastr.success("Sukces!", "Zdjęcie zostało dodane");
    } catch (error) {
      toastr.error("Błąd!", "Coś poszło nie tak");
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  const handleDeletePhoto = async (photo) => {
    try {
      await deletePhoto(photo);
    } catch (error) {
      toastr.error("Błąd", error.message);
    }
  };

  const handleSetProfilePhoto = async (photo) => {
    try {
      await setProfilePhoto(photo);
    } catch (error) {
      toastr.error("Błąd", error.message);
    }
  };

  return (
    <Segment>
      <Header dividing size='large' content='Zdjęcia' />
      <Grid>
        {files.length === 0 && (
          <Grid.Row>
            <Grid.Column width={16}>
              <DropzoneInput setFiles={setFiles} />
            </Grid.Column>
          </Grid.Row>
        )}
        {files.length > 0 && (
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={5}>
              <Header as='h4' content='Wykadruj zdjęcie' />
              <CropperInput
                setImage={setImage}
                imagePreview={files[0].preview}
              />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
              <Header as='h4' content='Podgląd i akceptacja' />
              <div
                className='img-preview'
                style={{
                  minHeight: "200px",
                  minWidth: "200px",
                  overflow: "hidden",
                }}
              />
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={handleUploadImage}
                  style={{ width: "100px" }}
                  primary
                  icon='check'
                />
                <Button
                  disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: "100px" }}
                  icon='close'
                />
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
      <Divider />
      <UserPhotos
        photos={photos}
        profile={profile}
        deletePhoto={handleDeletePhoto}
        setProfilePhoto={handleSetProfilePhoto}
      />
    </Segment>
  );
};

export default compose(
  connect(mapStateToProps, mapStateToDispatch),
  firestoreConnect((auth) => query(auth))
)(PhotosPage);
