import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'

// Reusable CustomInput component
const CustomInput = ({ htmlId, type = "text", placeholder, label, value, onChange }) => (
  <div className="flex flex-col mb-2 w-100 flex-left">
    <label htmlFor={htmlId}>{label}</label>
    <input
      type={type}
      id={htmlId}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      maxLength={200}
    />
  </div>
);

// Reusable CustomSelect component
const CustomSelect = ({ htmlId, label, options, multiple = false, value, onChange }) => (
  <div className="flex flex-col mb-2 w-100 flex-left">
    <label htmlFor={htmlId}>{label}</label>
    <select name={htmlId} id={htmlId} multiple={multiple} value={value} onChange={onChange}>
      <option disabled value="">No Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const Blog = ({
  _id,
  title: existingTitle,
  slug: existingSlug,
  category: existingCategory,
  description: existingDescription,
  tags: existingTags,
  status: existingStatus,
  
}) => {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  
  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [category, setCategory] = useState(existingCategory || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [tags, setTags] = useState(existingTags || '');
  const [status, setStatus] = useState(existingStatus || '');

  const categoryOptions = [
    { value: "htmlcssjs", label: "Html, Css & Js" },
    { value: "nextreact", label: "Next Js, React Js" },
    { value: "database", label: "Database" },
    { value: "deployment", label: "Deployment" },
  ];

  const tagsOptions = [
    { value: "html", label: "Html" },
    { value: "css", label: "Css" },
    { value: "js", label: "JS" },
    { value: "react", label: "React Js" },
    { value: "next", label: "Next Js" },
    { value: "database", label: "Database" },
    { value: "deployment", label: "Deployment" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "publish", label: "Publish" },
  ];

  async function createBlog(ev){
    ev.preventDefault();
    const data = {
      title,
      slug,
      category,
      description,
      tags,
      status,
    };
    if(_id){
      await axios.put("/api/blogs", {...data, _id})
    }else{
      await axios.post("/api/blogs", data)
    }
    
    // Reset form after submission
    setTitle('');
    setSlug('');
    setCategory('');
    setDescription('');
    setTags([]);
    setStatus('');
  
    setRedirect(true);
  }
  
  if(redirect){
    router.push("/wp-admin/blogs");
    return null;
  }

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
    setSlug(newSlug);
  };
  

  return (
    <>
      <form className="addWebsiteform" onSubmit={createBlog}>
        {/* Blog title */}
        <CustomInput
          htmlId="title"
          placeholder="Enter small title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Blog slug */}
        <CustomInput
          htmlId="slug"
          placeholder="Enter slug url"
          label="Slug"
          value={slug}
          onChange={handleSlugChange}
        />

        {/* Blog category */}
        <CustomSelect
          htmlId="category"
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <p className="flex gap-1 mt-1 mb-1 exisitingcategory">
          Selected: <span>{category || "None"}</span>
        </p>

        {/* Blog description */}
        <div className="flex flex-col mb-2 description w-100 left">
          <label htmlFor="description">Blog Content</label>
      <MarkdownEditor
      style={{width:'100%', height:'400px'}}
      value={description}
      onChange={(e) => setDescription(e.text)}
      renderHTML={(text)=>(
        <ReactMarkdown components={{
          code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || ' ');
            if(inline){
              return <code>{children}</code>
            }else if(match){
              return (
              <div style={{position:'relative'}}>
                <pre style={{padding:'0', borderRadius:'5px', overflowX:'auto', whiteSpace:'pre-wrap'}} {...props}>
                  <code>{children}</code>
                  <button style={{position:'absolute', top:'0', right:'0', zIndex:'1'}}
                  onClick={()=> navigator.clipboard.writeText(children)
                  }>copy code</button>
                </pre>
              </div>
              );
            }else{
              return <code {...props}>{children}</code>
            }
          }
        }}>
          {text}
        </ReactMarkdown>
      )}
      />
      
      
      
      
          {/* <textarea
            id="description"
            placeholder="Enter blog content"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea> */}
        </div>

        {/* Tags */}
        <CustomSelect
          htmlId="tags"
          label="Tags"
          options={tagsOptions}
          multiple={true}
          value={tags}
          onChange={(e) => setTags([...e.target.selectedOptions].map(option => option.value))}
        />
        <p className="flex gap-1 mt-1 mb-1 exisitingcategory">
          Selected: <span>{tags.length > 0 ? tags.join(', ') : "None"}</span>
        </p>

        {/* Status */}
        <CustomSelect
          htmlId="status"
          label="Status"
          options={statusOptions}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <p className="flex gap-1 mt-1 mb-1 exisitingcategory">
          Selected: <span>{status || "None"}</span>
        </p>

        {/* Save button */}
        <div className="mb-2 w-100">
          <button className="w-100 addwebbtn flex-center" type="submit">SAVE BLOG</button>
        </div>
      </form>
    </>
  );
};

export default Blog;
