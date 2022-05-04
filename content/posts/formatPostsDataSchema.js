
/**
 * @description This function extracts post url from hashnode content api response data
 * @param { Object } data => The hashnode post data
 * @returns { String }
**/
function hashnodePostUrl(data) {
  return (data.author && data.author.publicationDomain) ? `https://${data.author.publicationDomain}/${data.slug}` : `https://${data.author.blogHandle}.hashnode.dev/${data.slug}`;
}
