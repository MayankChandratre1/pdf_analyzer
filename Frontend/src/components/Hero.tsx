import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="bg-[#EAEAEA] py-20" id='hero'>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-universe mb-4 text-[#1C1B1B]">
            Revolutionize Your Reporting with AI
          </h1>
          <p className="text-xl mb-6 text-[#585857] font-inter">
            ReportWise leverages cutting-edge AI to streamline your reporting process, saving time and increasing accuracy.
          </p>
          <Button className="bg-[#F28B19] hover:bg-[#D47517] text-white mr-4">Learn More</Button>
          <Button className="bg-[#1E88E5] hover:bg-[#1565C0] text-white">Try for Free</Button>
        </div>
        <div className="md:w-1/2">
          <img src="/placeholder.svg?height=400&width=400" alt="Abstract data visualization" className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}

