import OverviewCard from '@/components/common/OverviewCard'
import { overviewCards } from '@/data/data'

const Home = () => {
  return (
    <section aria-labelledby="page-title" className="section">
      <h1 id="page-title" className="heading1">
        Welcome back, John
      </h1>
      <p className="paragraph text-gray-500">
        Here&apos;s current status of your eStore.
      </p>
      <div className="my-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
        {overviewCards.map((cardData) => (
          <OverviewCard {...cardData} key={cardData.title} />
        ))}
      </div>
    </section>
  )
}

export default Home
