export interface IPostCard {
    post: IPost
}

export interface IPost {
    id: string
    title: string
    description: string
    campaign_name: string
    year_salary: string
    location: string
    employment: string
    authorId: string
    created_at: string
    updated_at: string
    author: IAuthor
  }
  
  export interface IAuthor {
    id: string
    email: string
    username: string
    created_at: string
    updated_at: string
  }
  