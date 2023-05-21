describe('log in test', function() {
  beforeEach(function() {
   cy.request('POST', 'http://localhost:3003/api/testing/reset')
   const user = {
    username: 'tester',
    password: 'test'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user) 
  cy.visit('http://localhost:3000')
 })

 it('login form is visible', function() {
  cy.contains('username')
  cy.contains('password')
  cy.contains('login')

})

it('login form can be opened', function() {
  cy.contains('login').click()
})

 it('login fails with wrong password', function() {
  cy.get('#username').type('tester')
  cy.get('#password').type('wrong')
  cy.get('#login-button').click()
  cy.contains('Wrong username or password')
})

it('login OK with correct credentials', function() {

  cy.get('#username').type('tester')
  cy.get('#password').type('test')
  cy.get('#login-button').click()
  cy.contains('blogs')
  cy.contains('tester logged in')

})

describe('When logged in', function() {
  beforeEach(function() {
  cy.get('#username').type('tester')
  cy.get('#password').type('test')
  cy.get('#login-button').click()
  cy.contains('tester logged in')

  })
  it('logged user can create a blog', function() {
    cy.contains('add blog').click()
    cy.get('#blogtitle').type('testtitle')
    cy.get('#blogauthor').type('testauthor')
    cy.get('#blogurl').type('testurl')
    cy.contains('create').click()
    cy.get('.message').contains("A new blog testtitle by testauthor is added")
    cy.get('#blogEntity').contains("testtitle testauthor")

  })


  describe('Logged user actions', function() {
    beforeEach(function() {
      cy.contains('add blog').click()
    cy.get('#blogtitle').type('testtitle')
    cy.get('#blogauthor').type('testauthor')
    cy.get('#blogurl').type('testurl')
    cy.contains('create').click()
    cy.get('#blogEntity').contains("testtitle testauthor")

    })
  it('Logged user can like a blog', function() {
    cy.contains('show').click()
    cy.get('#blogLong').contains("likes 0")
    cy.contains('like').click()
    cy.get('#blogLong').contains("likes 1")
    cy.contains('like').click()
    cy.get('#blogLong').contains("likes 2")


  })

  it('Logged user that added a blog can delete it', function() {
    cy.contains('show').click()
    cy.get('#deleteblog').click()
    cy.get('.message').contains("Blog deleted successfully")
    cy.should('not.contain', 'testtitle testauthor')
    cy.get('#blogEntity').should('not.exist');

  })

  it('Logged user that did not add a blog cannot delete it', function() {
    cy.contains('logout').click()
    const user = {
     username: 'newtester',
     password: 'test'
   }
   cy.request('POST', 'http://localhost:3003/api/users/', user) 
   cy.visit('http://localhost:3000')
   cy.get('#username').type('newtester')
   cy.get('#password').type('test')
   cy.get('#login-button').click()
   cy.contains('newtester logged in')
   cy.contains('show').click()
   cy.get('#deleteblog').should('not.exist');

    

  })

  it('Blogs are sorted according to the like number', function() {


    cy.contains('add blog').click()
    cy.get('#blogtitle').type('4likes')
    cy.get('#blogauthor').type('4likes')
    cy.get('#blogurl').type('testurl')
    cy.contains('create').click()
    cy.get('.message').contains("A new blog 4likes by 4likes is added")
    cy.get('#bloglist').contains("4likes 4likes")
    cy.contains('4likes 4likes').find('#showbutton').click()
    cy.contains('4likes 4likes')
      .should('contain', 'likes 0')
    cy.contains('4likes 4likes').find('#likebutton').click()
    cy.contains('4likes 4likes')
      .should('contain', 'likes 1')    
    cy.contains('4likes 4likes').find('#likebutton').click()
    cy.contains('4likes 4likes')
      .should('contain', 'likes 2')
    cy.contains('4likes 4likes').find('#likebutton').click()
    cy.contains('4likes 4likes')
      .should('contain', 'likes 3')
    cy.contains('4likes 4likes').find('#likebutton').click()
    cy.contains('4likes 4likes')
      .should('contain', 'likes 4')

      cy.contains('add blog').click()
      cy.get('#blogtitle').type('2likes')
      cy.get('#blogauthor').type('2likes')
      cy.get('#blogurl').type('testurl')
      cy.contains('create').click()
      cy.get('.message').contains("A new blog 2likes by 2likes is added")
      cy.get('#bloglist').contains("2likes 2likes")
      cy.contains('2likes 2likes').find('#showbutton').click()
      cy.contains('2likes 2likes')
        .should('contain', 'likes 0')
      cy.contains('2likes 2likes').find('#likebutton').click()
      cy.contains('2likes 2likes')
        .should('contain', 'likes 1')    
      cy.contains('2likes 2likes').find('#likebutton').click()
      cy.contains('2likes 2likes')
        .should('contain', 'likes 2')
 
      cy.contains('add blog').click()
      cy.get('#blogtitle').type('5likes')
      cy.get('#blogauthor').type('5likes')
      cy.get('#blogurl').type('testurl')
      cy.contains('create').click()
      cy.get('.message').contains("A new blog 5likes by 5likes is added")
      cy.get('#bloglist').contains("5likes 5likes")
      cy.contains('5likes 5likes').find('#showbutton').click()
      cy.contains('5likes 5likes')
        .should('contain', 'likes 0')
      cy.contains('5likes 5likes').find('#likebutton').click()
      cy.contains('5likes 5likes')
        .should('contain', 'likes 1')    
      cy.contains('5likes 5likes').find('#likebutton').click()
      cy.contains('5likes 5likes')
        .should('contain', 'likes 2')
        cy.contains('5likes 5likes').find('#likebutton').click()
      cy.contains('5likes 5likes')
        .should('contain', 'likes 3')
        cy.contains('5likes 5likes').find('#likebutton').click()
      cy.contains('5likes 5likes')
        .should('contain', 'likes 4')
        cy.contains('5likes 5likes').find('#likebutton').click()
      cy.contains('5likes 5likes')
        .should('contain', 'likes 5')

      cy.contains('add blog').click()
      cy.get('#blogtitle').type('1like')
      cy.get('#blogauthor').type('1like')
      cy.get('#blogurl').type('testurl')
      cy.contains('create').click()
      cy.get('.message').contains("A new blog 1like by 1like is added")
      cy.get('#bloglist').contains("1like 1like")
      cy.contains('1like 1like').find('#showbutton').click()
      cy.contains('1like 1like')
        .should('contain', 'likes 0')
      cy.contains('1like 1like').find('#likebutton').click()
      cy.contains('1like 1like')
        .should('contain', 'likes 1')    
      

      cy.contains('add blog').click()
      cy.get('#blogtitle').type('3likes')
      cy.get('#blogauthor').type('3likes')
      cy.get('#blogurl').type('testurl')
      cy.contains('create').click()
      cy.get('.message').contains("A new blog 3likes by 3likes is added")
      cy.get('#bloglist').contains("3likes 3likes")
      cy.contains('3likes 3likes').find('#showbutton').click()
      cy.contains('3likes 3likes')
        .should('contain', 'likes 0')
      cy.contains('3likes 3likes').find('#likebutton').click()
      cy.contains('3likes 3likes')
        .should('contain', 'likes 1')  
      cy.contains('3likes 3likes').find('#likebutton').click()
      cy.contains('3likes 3likes')
        .should('contain', 'likes 2')  
      cy.contains('3likes 3likes').find('#likebutton').click()
      cy.contains('3likes 3likes')
        .should('contain', 'likes 3')  

    cy.visit('http://localhost:3000')

    cy.get('.blogEntity').should('have.length', 6);

    cy.get('.blogEntity').eq(0).should('contain', '5likes 5likes')
    cy.get('.blogEntity').eq(1).should('contain', '4likes 4likes')
    cy.get('.blogEntity').eq(2).should('contain', '3likes 3likes')
    cy.get('.blogEntity').eq(3).should('contain', '2likes 2likes')
    cy.get('.blogEntity').eq(4).should('contain', '1like 1like')
    cy.get('.blogEntity').eq(5).should('contain', 'testtitle testauthor')







  })


  })

})



})


