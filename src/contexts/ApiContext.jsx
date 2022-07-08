import React,{useState,createContext,useCallback} from 'react'
import axios from "axios";

export const apiContext = createContext();

export default function ApiContextProvider({children}) {
    const [fetchedRepo, setFetchedRepo] = useState();
    const [fetchedPackages, setFetchedPackages] = useState([]);
    const [downloadscount, setDownloadsCount] = useState([]);
    const [weeklyDownloads,setWeeklyDownloads] = useState()
    const [monthlyDownloads,setMonthlyDownloads] = useState() 
    const [commits,setCommits] = useState()

    const url = "https://registry.npmjs.com/-/v1/search?";

    const fetchPackages = useCallback(async (topic) => {
      const queryString = "text=" + topic + "&size=12";
      await axios
        .get(url + queryString)
        .then((res) => {
          setFetchedPackages(res.data.objects);      
        })
        .catch((err) => {
          console.log(err);
        });
        getDownloads();
    }, []);

    const packs = fetchedPackages?.map((p) => p.package.name);

  const getDownloads = async () => {
    let packslist = [];
    packs?.map((packname) => packslist?.push(packname));

    const promiseOfPacks = packslist?.map(async (packname) => {
      let packages = await axios.get(
        `https://api.npmjs.org/downloads/point/last-week/${packname}`
      );
      return packages;
    });
    let alldownloads = await Promise.all(promiseOfPacks);
    setDownloadsCount(alldownloads);
  };

  const fetchRepos = useCallback(
    async(reponame) => {
      const arr = reponame?.split("");
      arr?.splice(8, 0, "api.");
      arr?.splice(19, 0, "/repos");
      const gitapi = arr?.join("");
      await axios
        .get(gitapi, {
          headers: {
            Accept: "application/vnd.github.v3+json"
          }
        })
        .then((res) => {
          // setFetchedRepos(res.data.items);
          setFetchedRepo(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
        // getWeeklyDownloads()
    },
    [],
  )

  const getCommits=useCallback(   
    async(rname)=>{
      const carr = rname?.split("");
      carr?.splice(8, 0, "api.");
      carr?.splice(19, 0, "/repos");
      const api = carr?.join("")
      const apiText = "/stats/commit_activity";
       const commits_API = api?.concat(apiText)
      await axios.get(commits_API, {
        headers: {
          Accept: "application/vnd.github.v3+json"
        }
      })
      .then((res)=>{
        setCommits(res?.data)
        
      })
      .catch(err=>console.log(err))
    },
    [],
  )
  
  const getPackDownloads = useCallback(
    async(pname)=>{
      await axios.get(`https://api.npmjs.org/downloads/range/last-week/${pname}`)
      .then((res)=>{
        setWeeklyDownloads(res.data.downloads)
      })
      .catch(err=>console.log(err))

      await axios.get(`https://api.npmjs.org/downloads/range/last-month/${pname}`)
      .then((res)=>{
        setMonthlyDownloads(res.data.downloads)
      })
      .catch(err=>console.log(err))
  },
    [],
  ) 

  
    const providerItem = {fetchPackages,fetchRepos,getPackDownloads,getCommits,fetchedRepo,fetchedPackages,setFetchedPackages,
     downloadscount,weeklyDownloads,monthlyDownloads,commits };
    return (
        <div>
            <apiContext.Provider value={providerItem}>
               {children}
            </apiContext.Provider>
        </div>
    )
}
