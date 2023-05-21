import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


describe('frontend test', () => {


    test('renders content', () => {
        const blog = {
            title: "testtitle",
            author: "testauthor",
            url: "test.com",
            user: "6465f3a491b003f0af0d06cc"
        }
        const { container } = render(<Blog blog={blog} />)
    
        
        const element = container.querySelector('#blogShort')
      expect(element).toHaveStyle('display: block')
      const elementLong = container.querySelector('#blogLong')
      expect(elementLong).toHaveStyle('display: none')
    
    
    })


    
    test('renders hidden content after clicking button', async () => {
      const blog = {
        title: 'testtitle',
        author: 'testauthor',
        url: 'test.com',
        user: '6465f3a491b003f0af0d06cc',
      };
    
      const container = render(
        <Blog
          blog={blog}
        />
      ).container
    
      const button = screen.getByText('show');
      await fireEvent.click(button)

    
      const elementLong = container.querySelector('#blogLong');
      expect(elementLong).toHaveStyle({ display: 'block' });
    });

    test('several clicks on like button are countered', () => {
        const mockHandleLikeUp = jest.fn();
        const blog = {
            title: 'testtitle',
            author: 'testauthor',
            url: 'test.com',
            user: '6465f3a491b003f0af0d06cc',
          };
        
          render(
            <Blog
              blog={blog}
              handleLikeUp={mockHandleLikeUp}
            />
          );

          const button = screen.getByText('like');
          fireEvent.click(button);
          expect(mockHandleLikeUp).toHaveBeenCalledTimes(1);
          fireEvent.click(button);
          fireEvent.click(button);
          expect(mockHandleLikeUp).toHaveBeenCalledTimes(3);



    })

    test('<BlogForm /> updates parent state and calls onSubmit', async () => {
        const createBlog = jest.fn()
      
        render(<BlogForm createNewBlog={createBlog} />)
      
        const inputTitle = screen.getByPlaceholderText('blog title')
        const inputAuthor = screen.getByPlaceholderText('blog author')
        const inputUrl = screen.getByPlaceholderText('blog url')

        const sendButton = screen.getByText('create')
      
        await userEvent.type(inputTitle, 'title')
        await userEvent.type(inputAuthor, 'author')
        await userEvent.type(inputUrl, 'url.com')

        fireEvent.click(sendButton);
      
        expect(createBlog).toHaveBeenCalledTimes(1);
        expect(createBlog).toHaveBeenCalledWith({
            title: 'title',
            author: 'author',
            url: 'url.com',
          });      })

})
