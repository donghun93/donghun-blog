const TagNoLink = ({ text }) => {
  return (
    <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
      {text.split(' ').join('-')}
    </a>
  )
}

export default TagNoLink
