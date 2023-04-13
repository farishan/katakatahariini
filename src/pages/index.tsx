import { ReactElement, useEffect, useState } from 'react'
import type { NextPageWithLayout } from './_app'
import Layout from '@/components/Layout'
import Button from '@/components/Button'
import useSWR from 'swr';
import { toast } from 'react-hot-toast';
import IconCopy from '@/components/icons/IconCopy';
import IconRefresh from '@/components/icons/IconRefresh';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Quote = {
  message: string,
  author: string
}

const Page: NextPageWithLayout = () => {
  const [lastIndex, setLastIndex] = useState<number | undefined>()
  const { data, error } = useSWR('/api/quotes', fetcher);
  const [quote, setQuote] = useState<Quote | undefined>()

  const getRandomIndex = (data: any[]) => {
    let result = Math.floor(Math.random() * data.length)

    while (result === lastIndex) {
      result = Math.floor(Math.random() * data.length)
    }

    setLastIndex(result)
    return result
  }

  const getRandomQuote = (data: Quote[]) => data ? data[getRandomIndex(data)] : undefined

  const copy = () => {
    if (!quote) return
    navigator.clipboard.writeText(`${quote.message}\n\n${quote.author}`)
    toast.success('Copied!')
  }

  useEffect(() => {
    setQuote(data ? getRandomQuote(data) : undefined)
  }, [data])

  return (
    <>
      <div className="absolute w-full h-screen min-h-[350px] left-0 top-0 flex items-center py-24 overflow-y-auto">
        <div className="container">
          <div className="lg:w-3/4 pb-16 flex items-center">
            <blockquote>
              {
                error ? (<div>Failed to load</div>) : !data || !quote ? (<div>Loading...</div>) : <>
                  <span className="text-lg font-medium">
                    {quote.message}
                  </span>
                  <footer className="text-sm font-normal mt-4">&mdash; {quote.author}</footer>
                </>
              }
            </blockquote>
          </div>
        </div>
      </div>

      <div className="fixed w-full left-0 bottom-0 bg-white bg-opacity-90 z-50">
        <div className="container">
          <div className="flex space-x-4 py-8">
            <div className="w-1/2">
              <Button className="w-full" onClick={copy} title="Copy">
                <IconCopy />
              </Button>
            </div>
            <div className="w-1/2">
              <Button className="w-full" onClick={() => setQuote(getRandomQuote(data))} title="Refresh">
                <IconRefresh />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Page