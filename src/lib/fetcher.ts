import type { MutationFetcher } from 'swr/mutation'

const getFetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json())
const postFetcher = <TArg = unknown, TData = any>(): MutationFetcher<
  TData,
  string,
  TArg
> => {
  return async (url, { arg }) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arg),
    })

    if (!res.ok) {
      throw new Error(await res.text())
    }

    return res.json()
  }
}


export { getFetcher, postFetcher }