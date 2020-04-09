import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

function Post({ detail, alt, date, image, title, url }) {
    console.log(date)
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }) 
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(new Date(date)) 
    
    return (
      <div className="max-w-lg">
        <a href={url}>
          <img alt={alt} src={image} />
        </a>
        <div className="text">
          <p class="font-serif font-medium text-3xl">{title}</p>
          <p class="font-light text-sm pt-2">{`${da} ${mo} ${ye}`}</p>
          <p class="font-serif pt-8"
      dangerouslySetInnerHTML={{
        __html: documentToHtmlString(detail),
      }}
    ></p>
        </div>
      </div>
    )
  }
  
  export default Post