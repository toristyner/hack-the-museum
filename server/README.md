# Endpoints

## Museum

### Location
*Endpoint:* `GET /api/museum/locations/<location_id>`

---

### Artwork
*Endpoint:* `GET /api/museum/artwork/<artwork_id>`

---

### Add Song
*Endpoint:* `POST /museum/artwork/<artwork_id>/song`

*Body:*
```
  { <spotify_song_object> }
```

---

### Like Song
*Endpoint:* `POST /museum/artwork/<artwork_id>/song/like`

*Body:*
```
  { <spotify_song_object> }
```

---

### Artwork Recommendation From Genres
*Endpoint:* `POST /museum/artwork/recommendations/genres`

*Body:*
```
  { genres: [<genre_name>, <genre_name>] }
```

## Spotify

### Search
*Endpoint:* `GET /api/spotify/search?q=<query>`

---

### Artist Detail
*Endpoint:* `GET /api/spotify/artist/<spotify_artist_id>`

---

### Genres
*Endpoint:* `GET /api/spotify/genres`
