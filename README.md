Auto-Complete component with following features:

1. There is error handling in place for failed API requests, ensuring that the user is informed if something goes wrong and providing a fallback behavior.
2. It highlights the searched text entered in the input box inside results section.
3. It has debounce function which helps to reduce unnecessary network requests.
4. It has unit test cases which is written in RTL.
5. It has some accessibility features such as ARIA attributes, keyboard navigation support, and highlighted text for matched results, which can improve usability for users with disabilities.
6. The autocomplete functionality is encapsulated within a single React component (AutoComplete), promoting reusability and maintainability.
7. This component is functional component used hooks for state and Typescript for types.

Types:

Product - Represents a product object with various properties.

Property:Type -> Description

id:number -> Unique identifier for the product.
title:string -> Title of the product.
description:string -> Description of the product.
price:number -> Price of the product.
discountPercentage:number -> Discount percentage applied to the product.
rating:number -> Rating of the product.
stock:number -> Quantity of the product in stock.
brand:string -> Brand of the product.
category:string -> Category of the product.
thumbnail:string -> URL of the product thumbnail image.
images:string[] -> Array of URLs for additional product images.

APIResponse - Represents the response object returned by the API.

Property:Type -> Description
products:Product[] -> Array of products returned by the API.
total:number -> Total number of products available.
skip:number -> Number of products skipped in pagination.
limit:number -> Maximum number of products per page.

Run the project
Clone the repo
Run npm install or yarn install
Development mode: Run npm start or yarn start
Production build: Run npm run build
