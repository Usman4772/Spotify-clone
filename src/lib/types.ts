export interface GlobalContextProps{
    children:React.ReactNode
}

export interface HeaderProps{
    children:React.ReactNode
}


export interface SongProps{
    song_path:string,
    title:string,
    author:string,
    songCover:string
    _id:any
  }


  export interface PlaylistProps{

    image:string,
    title:string,
    id?:any
}

export interface CustomPlaylistProps{
    playlist_name:string,
    playlist_cover:any,
    songs?:Array<SongProps>,
    playlist_authors?:any,
    user?:any,
    id?:any
}