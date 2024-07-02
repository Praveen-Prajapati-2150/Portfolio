import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import ReactMarkdown from 'react-markdown';
// import raw from 'raw.macro';
import Main from '../layouts/Main';

// const markdown = raw('../data/about.md');

// const LinkRenderer = ({ ...children }) => <Link {...children} />;

const Blogs = () => {
  const [contentArray, setContentArray] = useState([]);
  const [count, setCount] = useState(1);

  // Function to add content to the array
  const addContent = (type, content) => {
    setCount((prevCount) => prevCount + 1);
    setContentArray([
      ...contentArray,
      { type, content: String(content), index: count },
    ]);
  };

  // Function to clear the array
  const clearContent = () => {
    setContentArray([]);
  };

  const handleCodeEdit = (index, event) => {
    const newContentArray = [...contentArray];
    newContentArray[index].content = event.target.value;
    setContentArray(newContentArray);
  };

  console.log(contentArray);

  return (
    <Main title="About" description="Learn about Praveen Prajapati">
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2 data-testid="heading">
              <Link to="/about">Blogs</Link>
            </h2>
            {/* <p>(in about {count} words)</p> */}
          </div>
        </header>

        <div className="container">
          <div>
            <input className="heading" type="text" placeholder="Heading" />
            <input
              className="description"
              type="text"
              placeholder="Description"
            />
          </div>

          <div>
            {contentArray.map((item, index) => (
              <div key={item.index}>
                {item.type === 'codeblock' ? (
                  <textarea
                    value={item.content}
                    onChange={(event) => handleCodeEdit(index, event)}
                  />
                ) : (
                  <div>{item.content}</div>
                )}
              </div>
            ))}
          </div>

          <div className="inputButton">
            <button type="button" className="button">
              +
            </button>

            <div className="buttons">
              <button
                type="button"
                onClick={() => addContent('input', <input type="text" />)}
              >
                Add Input
              </button>
              <button
                type="button"
                onClick={() =>
                  addContent(
                    'codeblock',
                    <code>{'<div>Hello World</div>'}</code>
                  )
                }
              >
                Add Code Block
              </button>
              <button
                type="button"
                onClick={() => addContent('textarea', <textarea />)}
              >
                Add Text Area
              </button>
              <button
                type="button"
                onClick={() =>
                  addContent(
                    'video',
                    <iframe
                      width="560"
                      height="315"
                      src="https://www.youtube.com/embed/QKhFHcfe2KU?si=YqKdBiuf39y74omD"
                      title="YouTube video player"
                      // frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )
                }
              >
                Add Video
              </button>
              <button type="button" onClick={clearContent}>
                Clear All
              </button>
              {/* <button type="button" className="button">
                textarea
              </button>
              <button type="button" className="button">
                code
              </button>
              <button type="button" className="button">
                image
              </button>
              <button type="button" className="button">
                add the image from splash
              </button>
              <button type="button" className="button">
                add video
              </button> */}
            </div>
          </div>
        </div>
        {/* <ReactMarkdown
          source={markdown}
          renderers={{
            Link: LinkRenderer,
          }}
          escapeHtml={false}
        /> */}
      </article>
    </Main>
  );
};

export default Blogs;
