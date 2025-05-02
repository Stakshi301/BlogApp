import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../home/blogsMiddleware";
import { ApiStatus } from "../../network/ApiStatus";
import { updatePostCreationStatus } from "../home/blogsslice";
import './Post.scss';

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const genres = useSelector((state) => state.genres.genres);
  const blogCreationStatus = useSelector((state) => state.blogs.create);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onSubmitForm = (formData) => {
    dispatch(createPost(formData));
  };

  useEffect(() => {
    if (blogCreationStatus === ApiStatus.success) {
      setIsModalOpen(false);
      dispatch(updatePostCreationStatus(ApiStatus.init));
    }
  }, [blogCreationStatus, dispatch]);

  return (
    <>
      <Button className="addBtn"
        onClick={toggleModal}
        icon={<span className="material-icons">add</span>}
      >
        Create Post
      </Button>
      <Modal className="Modal" footer={null} open={isModalOpen} closable onCancel={toggleModal}>
        <Form className="formContainer" layout="vertical" onFinish={onSubmitForm}>
          <Form.Item className="formItem"
            label="Select Genre"
            name="genre"
            rules={[{ required: true, message: "Please pick a genre" }]}
          >
            <Select className="Selector"
              options={genres.map((genre) => ({
                label: genre.title,
                value: genre.id,
              }))}
            />
          </Form.Item>

          <Form.Item className="formItem"
            label="Enter post description"
            name="description"
            rules={[
              { required: true, message: "Post description is required" },
            ]}
          >
            <Input.TextArea className="textarea" />
          </Form.Item>
          <Button className="submitBtn"
            htmlType="submit"
            block
            type="primary"
            loading={blogCreationStatus === ApiStatus.pending}
          >
            Create Post
          </Button>
        </Form>
      </Modal>
    </>
  );
}
