[denerin.org](https://denerin.org/)

## Henrik Denerin new portfolio

Henrik is my sons friends father and is an award winning music composer. His previues webpage was an old Worpress page that wasn´t updated to the modern times like responsiveness.
So I asked him if I could help him with this task.

## Requriments and design

Henrik wanted almost the same path layout as before with some tweaks for the better.  
We went for a clean page and had his music booklet as a base for all his pieces.  
Henrik use Soundcloud and sometimes Youtube videos so that had to be implemented with [React-player](https://www.npmjs.com/package/react-player) and made it almost to easy.  
The fonts of choice was Archivo and Noto sans that worked very well together.  
The colors did we pick out from [coolors.co](https://coolors.co/) and was in blue tones as it was his favoritecolors.

## Tech stack

* Front- and backend: NextJS 13.4.9 + Typescript
* CMS: DatoCMS
* Datafetching: GraphQL
* Styling: Tailwind + framermotion
  
Because he used Wordpress before a CMS was in order to implement and we choosed DatoCMS that is working like a charm with his uses.
I used NextJS 13 with the latest app router that I liked alot. It has it´s problems with framermotion and page transitions. So that one I have put on the side at the moment.

## Challenges 

I sure had some challenges in this ongoing project because I haven´t done it before.

* The landingpage consist of a image-slider that shows a piece of music that Henrik wrote to this new page. I didn´t wanna have a softfade between the images. So I went for two images that changes, the first will always be a number lower than the second. In that way I could get a smoother and seamless transition that I am quite happy with. The responsiveness maby not so much.
* Under works tab Henrik wanted to have all works in specific order. Maby not that hard just to get all works but to implement it in the dropdown was fun.
* The solos categorypage Henrik wanted it to be sort by instruments and not by year. So we needed to create a new tag for those in DatoCMS and after imported the data I went for a for-loop to create the unique lists for mapping.
* Henrik didn´t want to add any analytics so the cookie handler just sets a consent in local storage.
* All the concerts has to be showned on the page and is more than 100 records that DatoCMS handles in one fetch. So when the api fetches the data I look for the count to see if I need to do one more fetch to get them all. Right now it is simple to check over 100 records but gonna refactor in the future so it is scalable.

