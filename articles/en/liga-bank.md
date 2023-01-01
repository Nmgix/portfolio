---
    id: 1
    title: Liga Bank
    subtitle: History of bank
    authorsFavorites: true
    ttr: 5
    date: 19.12.22
    type: article
    linkedImages: ["/images/articles/liga-bank/liga-bank-preview.png", "/images/articles/liga-bank/personal-account.png", "/images/articles/liga-bank/for-usual-income.png", 
    "/images/articles/liga-bank/for-usual-expenses.png", "/images/articles/liga-bank/draft-forum.png", "/images/articles/liga-bank/draft-forum-answer.png"]
    backgroundColor: ["#0057FF"]
    color: ["#FFFFFF"]
    techStack: ['Typescript', 'React']
    usefulLinks: [
        {
            name: 'Github', url: 'https://github.com/Nmgix/league-bank-ts'
        },
        {
            name: 'Deploy', url: 'https://nmgix.github.io/league-bank-ts/'
        }
    ]
    description: The project was made as a layout of one page according to the figma layout, then the design and the layout itself were thought out. Subsequently, it turned out to make the main and personal account pages.
    locale: en
---

# Layout

In the third study year, we had a direction "Frontend Development" and there were quite the basics (HTML, CSS and just a little bit of JS). My classmates and I already knew React pretty well at that time, and we also knew that in the fourth study year we would definitely have React. We agreed to make a page by layout hoping to avoid exams in this direction, got the layout from the teacher, gathered, and only I started developing. The problem was not in the approach, organization or the like, they just became lazy.

# Development

I developed the main page, there were problems when creating the calculator, but in the end I adjusted and configured everything. After creating the main page, I wanted to develop a Personal Account page and a small question-and-answer forum.

![Homepage image](/images/articles/liga-bank/liga-bank-preview.png)

> <b>Map 1.</b> Home page, final result as on the layout

At the time of the article, the LC is not completed, but I have implemented the logic of displaying funds with a graph and "income - expenses".
There are also mock news and templates at the beginning of the page. Templates were meant as a quick way to perform some action in the bank, for example, to pay for the Internet (just like in Sberbank ;))

It was assumed that a person can have several accounts, so that on the LC page you can see the drop-down menu "Select balance".

> ![Personal Account page image without invoice display](/images/articles/liga-bank/personal-account.png)
>
> > <b>Map 2.</b> PA page without invoice display, only news and templates
>
> ![Image of the account for future expenses, income](/images/articles/liga-bank/for-usual-income.png)
>
> > <b>Card 3.</b> Account for future expenses, income
>
> ![Image of an invoice for future expenses, expenses](/images/articles/liga-bank/for-usual-expenses.png)
>
> > <b>Card 4.</b> Invoice for future expenses, expenses

# The future

To be honest, I can't say that I will finish the project, I need motivation and ideas, and only the forum pages remain from the figma

> ![Image of the forum page, search engine](/images/articles/liga-bank/draft-forum.png)
>
> > <b>Map 5.</b> Forum page, search engine
>
> ![Image of the forum page, question and answer pages](/images/articles/liga-bank/draft-forum-answer.png)
>
> > <b>Map 6.</b> Forum page, question and answer pages

# Bonus

If you want to try the lc yourself,
the username and password is `kbtlove` (yes, a reference to college, then I was still studying there ;))
