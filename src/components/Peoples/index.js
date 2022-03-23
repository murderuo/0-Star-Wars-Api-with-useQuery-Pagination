import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import People from '../People';
import React, { useState } from 'react';

const queryClient = new QueryClient();

const fetchPeoples = async (page) => {
  const response = await axios.get(`http://swapi.dev/api/people/?page=${page}`);
  return response;
};

function Peoples() {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData, isFetching } = useQuery(
    ['peoples', page],
    () => fetchPeoples(page),
    {
      keepPreviousData: true,
    },
  );
  //   console.log(data, status, error, isLoading);

  return (
    <>
      <div>
        <h2>Peoples</h2>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Loading fetching data</div>}
        {status === 'success' && (
          <>
            <div className="pagination">
              <button
                onClick={() => setPage(old => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Previus Page
              </button>
              <span>{page}</span>
              <button
                onClick={() => {
                  if (!isPreviousData && data.data.next) {
                    setPage(old => old + 1);
                  }
                }}
                disabled={isPreviousData || !data.data.next}
              >
                Next Page
              </button>
            </div>
            <div>
            {isFetching ? <div className='loading'>Loading...</div>:(data.data.results.map((item, index) => (<People key={index} people={item} />)))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default function Wraped() {
  return (
    <QueryClientProvider client={queryClient}>
      <Peoples />
    </QueryClientProvider>
  );
}
