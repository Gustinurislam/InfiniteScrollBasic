import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(20);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getUsers();
  }, [lastId, keyword]);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/users?search_query=${keyword}&lastId=${lastId}&limit=${limit}`,
    );
    const newUsers = response.data.result;
    setUsers([...users, ...newUsers]);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
  };

  const fetchMore = () => {
    setLastId(tempId);
  };

  const searchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setUsers([]);
    setKeyword(query);
  };

  return (
    <div className="">
      <form onSubmit={searchData}>
        <div className="flex items-center mb-5">
          <input
            type="text"
            className="border outline-none w-full mr-5 py-1 px-3 border-black placeholder-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find something here . . ."
          />
          <button type="submit" className="border py-1 px-3 border-black transform duration-150 active:scale-105">
            Search
          </button>
        </div>
      </form>

      <InfiniteScroll
        dataLength={users.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading . . .</h4>}
      >
        <div className="">
            <div className='grid grid-cols-5 text-lg md:text-2xl font-medium mb-3'>
              <h2>No</h2>
              <h2>ID</h2>
              <h2>Name</h2>
              <h2>Gender</h2>
              <h2>Email</h2>
            </div>
            {users.map((user, index) => (
              <div className='grid grid-cols-5 space-y-1 text-base md:text-lg' key={index}>
                <h3>{index + 1}</h3>
                <h3>{user.id}</h3>
                <h3>{user.name}</h3>
                <h3>{user.gender}</h3>
                <h3>{user.email}</h3>
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UserList;
