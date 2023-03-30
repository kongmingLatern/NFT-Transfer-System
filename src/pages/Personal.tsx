import Header from '@/component/common/Header'
import PersonalCard from '@/views/personal/Card'

export default function Personal() {
  return (
    <>
      <Header />
      <div className="my-2">
        <PersonalCard />
      </div>
    </>
  )
}
