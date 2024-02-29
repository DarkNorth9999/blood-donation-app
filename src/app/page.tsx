import Image from "next/image";
import Link from "next/link";
import classes from './page.module.css'
import ImageSlideshow from "@/components/images/image-slideshow";


export default function Home() {
  return (
    <>
    <header className={classes.header}>
      
      <div className={classes.slideshow}>
        <ImageSlideshow />
      </div>

      <div>
        <div className={classes.hero}>
          <h1>Save a life Today, Donate Blood</h1>
          <p>There is a constant need for blood donors, let a person smile again by donating blood</p>
        </div>

        <div className={classes.cta}>
          <Link href='donors/donor-form'>Become a Donor</Link>
          <Link href='patients/patient-form'>Request Blood</Link>
        </div>
      </div>
      
    </header>

    <main>
      <section className={classes.section}>
        <h2>How blood donation works?</h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum molestias sed alias vitae fugit odit quam ipsa quis nemo ab, aliquid, quas nulla magni iure libero, eveniet provident quia blanditiis.</p>
      </section>

      <section className={classes.section}>
        <h2>Why donate blood?</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ex magnam totam, ipsam, velit vitae quas officia provident blanditiis fugiat non mollitia facere pariatur placeat quidem quia vel perspiciatis sint?</p>
      </section>
    </main>
    </>
  );
}
