import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import React, { useRef } from "react";
import config from "../../config";
import "./PostingForm.css";

const PostingForm = (props) => {
  const { onPostAd = () => {} } = props;
  const [form] = Form.useForm();

  const handleOnSubmit = (values) => {
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      data.append(key, value);
    });

    fetch(config.api_ads, {
      method: "POST",
      // headers: { "Content-Type": "form-data" },
      body: data,
    })
      .then((res) => res.json())
      .then((response) => {
        onPostAd();
        form.resetFields();
      })
      .catch(console.error);
  };

  return (
    <Form
      form={form}
      onFinish={handleOnSubmit}
      className="form__posting"
      name="ad-post"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
    >
      <Title level={2}>Post New Ad</Title>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please provide an Ad title" }]}
      >
        <Input minLength="10" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please provide a Price" }]}
      >
        <InputNumber addonBefore="€" name="description" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please provide a Description" }]}
      >
        <TextArea id="description" />
      </Form.Item>
      <Form.Item
        label="Ad Image"
        name="ad_image"
        rules={[{ required: true, message: "Please provide an Image" }]}
        getValueFromEvent={(e) => e.file.originFileObj}
      >
        <Upload
          required
          maxCount={1}
          customRequest={({ onSuccess }) => onSuccess("ok")}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Post Ad
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostingForm;
