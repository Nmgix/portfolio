---
    id: 0
    title: My own components
    subtitle: The story of half a year long
    authorsFavorites: true
    ttr: 5
    date: 15.03.22
    type: article
    backgroundColor: ["#000"]
    color: ["#FFFFFF"]
    linkedImages: ["/images/articles/nmgix-components/components-preview1.png", "/images/articles/nmgix-components/components-preview2.png", "/images/articles/nmgix-components/figma.png", "/images/articles/nmgix-components/git-preview.png"
    ]
    techStack: ['Typescript', 'React']
    usefulLinks: [
        {
            name: 'Github', url: 'https://github.com/nmgix'
        }
    ]
    locale: en
---

<b>The realization of the need for my own components appeared after I wrote components from scratch for the 5th time for the next (not NextJS) project</b>

> we omit all sorts of bootstrap, I wanted to make something of my own :)

### Components

I started developing components in parallel with my site, this is how the figma file looks like

![figma](/images/articles/nmgix-components/figma.png)

Different ideas began to appear, for example `HTIV` (Highlight Text In View).
The essence is very simple, the text that is in the middle of the screen (the `Intersection Observer` is used) is highlighted in bold text.

Well, or, for example, cells. How many ~~ hemorrhoids ~~ problems there were with these components (the wrapper and the cell itself), I abandoned the development of components because of them. The essence is the same simple, under the hood a stiffened `container packing algorithm' is used.

### Problems

The idea quickly came up to create small pngs to display the progress of creating components in README.md , and besides, it looks great.

![git-preview](/images/articles/nmgix-components/git-preview.png)

One thing is, there is one more field missing, about the percentage of testing :)
The idea quickly fell off because I came to the conclusion that it's easier for me to brute-force testing, even though it's a `terrible` solution in a long time, I'll probably fix it.
