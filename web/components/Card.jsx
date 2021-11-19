import Wav from '../components/Wav'
const people = [
<<<<<<< HEAD:web/pages/feed/Card.tsx
  {
    name: "Ryan Dils",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
  // More people...
];
const activityItems = [
  {
    id: 1,
    person: people[0],
    song: "Title of Song",
    artist: "Name of Artist",
    time: "1h",
  },
  // More items...
];

export default function Card() {
  return (
    <div className="border-t-2 border-gray-300 rounded-b-lg pt-10 pb-8 px-6 bg-green-50 sm:px-10 sm:py-10">
      <ul role="list" className="divide-y divide-gray-200">
        {activityItems.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3 border-gray-900">
              <img
                className="h-6 w-6 rounded-full"
                src={activityItem.person.imageUrl}
                alt=""
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {activityItem.person.name}
                  </h3>
                  <p className="text-sm text-gray-500">{activityItem.time}</p>
=======
    {
      name: 'Ryan Dils',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
    },
    // More people...
  ]
  const activityItems = [
    { id: 1, person: people[0], song: 'Title of Song', artist: 'Name of Artist', time: '1h' },
    // More items...
  ]
  
  export default function Card(post) {
    return (
      <div className="border-t-2 border-gray-300 rounded-b-lg pt-10 pb-8 px-6 bg-green-50 sm:px-10 sm:py-10">
        <ul role="list" className="divide-y divide-gray-200">
          {activityItems.map((activityItem) => (
            <li key={post.id.toString()} className="py-4">
              <div className="flex space-x-3 border-gray-900">
                <img className="h-6 w-6 rounded-full" src={activityItem.person.imageUrl} alt="" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{activityItem.person.name}</h3>
                    <p className="text-sm text-gray-500">{activityItem.time}</p>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded "{activityItem.song}" by {activityItem.artist} 
                    <Wav></Wav>
                  </p>
>>>>>>> auth:web/components/Card.jsx
                </div>
                <p className="text-sm text-gray-500">
                  Uploaded "{activityItem.song}" by {activityItem.artist}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
