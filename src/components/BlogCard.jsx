import { useNavigate } from "react-router-dom";
function BlogCard({id,image, category, title, description, author,date }) {
  const navigate = useNavigate();
  
  function navigateTo (){
    navigate("/post/"+id)
  }

    return (
      <div className="flex flex-col gap-4">
        <a href="#" className="relative h-[212px] sm:h-[360px]">
          <img className="w-full h-full object-cover rounded-md"  src={image} alt="Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do"
                  onClick={()=>navigateTo()}/>
        </a>
        <div className="flex flex-col">
          <div className="flex">
            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">{category}
            </span>
          </div>
          <a href="#" >
            <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline" onClick={()=>navigateTo()}>
            {title}
            </h2>
          </a>
          <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {description}</p>
          <div className="flex items-center text-sm">
            <img className="w-8 h-8 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt="Tomson P." />
            <span>{author}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
   }
   export default BlogCard ;