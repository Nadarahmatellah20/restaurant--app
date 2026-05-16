export default function Footer() {
  return (
    <>
      <section className="py-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex justify-center gap-6">
          <a href="#"><img src="https://img.icons8.com/fluent/48/000000/facebook-new.png" alt="Facebook" className="w-10 h-10" /></a>
          <a href="#"><img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram" className="w-10 h-10" /></a>
          <a href="#"><img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter" className="w-10 h-10" /></a>
        </div>
      </section>
      <footer className="bg-gray-50 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Restaurant. Tous droits réservés.
      </footer>
    </>
  )
}
