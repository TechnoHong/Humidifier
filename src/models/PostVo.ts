export interface PostVo {
  id?: number
  title: string
  content: string
  firstAuthor?: string | null
  firstDate?: string
  lastAuthor?: string | null
  lastDate?: string | null
}
