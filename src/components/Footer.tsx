import { content } from '../content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>© {year} {content.home.name}. Built with React.</p>
    </footer>
  )
}
