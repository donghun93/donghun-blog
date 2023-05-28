const TagRoundNoLink = ({ text }) => {
  return (
    // <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
    //   {text.split(' ').join('-')}
    // </a>
    // <a className="mr-3 rounded-full bg-green-500 px-3 py-1 text-sm font-medium uppercase text-white hover:bg-green-600 dark:hover:bg-green-400">
    <a className="mr-3 rounded-full bg-primary-500 px-3 py-1 text-sm font-medium uppercase text-white hover:bg-primary-600 dark:hover:bg-primary-400">
      {text}
    </a>
  )
}

export default TagRoundNoLink
