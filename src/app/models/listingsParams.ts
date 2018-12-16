export class ListingsParams {
    after?: string; // after / before - only one should be specified. these indicate the fullname of an item in the listing to use as the anchor point of the slice.
    before?: string; 
    limit?: number; // limit - the maximum number of items to return in this slice of the listing.
    count?: number; // count - the number of items already seen in this listing. on the html site, the builder uses this to determine when to give values for before and after in the response.
    show?: string; // show - optional parameter; if all is passed, filters such as "hide links that I have voted on" will be disabled.
}

// To page through a listing, start by fetching the first page without specifying values for after and count. 
// The response will contain an after value which you can pass in the next request. It is a good idea, but not required, 
// to send an updated value for count which should be the number of items already fetched.