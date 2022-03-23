import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import Planet from '../Planet';
import React, { useState } from 'react';

const queryClient = new QueryClient();

const fetchPlanets = async page => {
  const response = await axios.get(
    `https://swapi.dev/api/planets/?page=${page}`,
  );
  return response;
};

function Planets() {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData, isFetching } = useQuery(
    ['planets', page],
    () => fetchPlanets(page),
    {
      keepPreviousData: true,
    },
  );
  // console.log(isPreviousData);
  // console.log(data.next);
  // console.log(data);

  return (
    <>
      <div>
        <h2>Planets</h2>
        {status === 'error' && (
          <div className="loading">Error fetching data</div>
        )}
        {status === 'loading' && (
          <div className="loading">Loading fetching data</div>
        )}
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
              {isFetching ? (
                <div className="loading">Loading...</div>
              ) : (
                data.data.results.map((item, index) => (
                  <Planet key={index} planet={item} />
                ))
              )}
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
      <Planets />
    </QueryClientProvider>
  );
}
