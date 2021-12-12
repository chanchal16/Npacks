import React,{useState,createContext,useCallback} from 'react'
import axios from "axios";

export const apiContext = createContext();

export default function ApiContextProvider({children}) {
    const [fetchedRepo, setFetchedRepo] = useState();
    const [fetchedPackages, setFetchedPackages] = useState([]);
    const [downloadscount, setDownloadsCount] = useState([]);
    const [weeklyDownloads,setWeeklyDownloads] = useState()
    const [monthlyDownloads,setMonthlyDownloads] = useState()
    // const [topic, setTopic] = useState(topicsArr[0].name);
    const url = "https://registry.npmjs.com/-/v1/search?";

    const fetchPackages = useCallback(async (topic) => {
      const queryString = "text=" + topic + "&size=10";
      await axios
        .get(url + queryString)
        .then((res) => {
          setFetchedPackages(res.data.objects);
          console.log("response", res.data.objects);
          console.log("fetchedtopics", fetchedPackages);
        })
        .catch((err) => {
          console.log(err);
        });
        getDownloads();
    }, []);

    const packs = fetchedPackages.map((p) => p.package.name);
  // console.log("names", packs);

  const getDownloads = async () => {
    let packslist = [];
    packs.map((packname) => packslist.push(packname));

    const promiseOfPacks = packslist.map(async (packname) => {
      let packages = await axios.get(
        `https://api.npmjs.org/downloads/point/last-week/${packname}`
      );
      // console.log("packages", packages);
      return packages;
    });
    let alldownloads = await Promise.all(promiseOfPacks);
    setDownloadsCount(alldownloads);
    // console.log('d',alldownloads)
  };

  const fetchRepos = useCallback(
    async(reponame) => {
      const arr = reponame.split("");
      console.log("array", arr);
      arr.splice(8, 0, "api.");
      arr.splice(19, 0, "/repos");
      const gitapi = arr.join("");
      console.log(gitapi);
      await axios
        .get(gitapi, {
          headers: {
            Accept: "application/vnd.github.v3+json"
          }
        })
        .then((res) => {
          // setFetchedRepos(res.data.items);
          setFetchedRepo(res.data);
          console.log("git-response", res.data);
          console.log("fetchedrepos", fetchedRepo);
        })
        .catch((err) => {
          console.log(err);
        });
        // getWeeklyDownloads()
    },
    [],
  )
  
  const getPackDownloads =useCallback(
    async(pname)=>{
      await axios.get(`https://api.npmjs.org/downloads/range/last-week/${pname}`)
      .then((res)=>{
        console.log('weekdownloads',res.data)
        setWeeklyDownloads(res.data.downloads)
      })
      .catch(err=>console.log(err))

      await axios.get(`https://api.npmjs.org/downloads/range/last-month/${pname}`)
      .then((res)=>{
        console.log('monthdownloads',res.data)
        setMonthlyDownloads(res.data.downloads)
      })
      .catch(err=>console.log(err))
  },
    [],
  ) 

  
    const providerItem = {fetchPackages, fetchRepos,getPackDownloads,fetchedRepo,fetchedPackages,
     downloadscount,weeklyDownloads,monthlyDownloads };
    return (
        <div>
            <apiContext.Provider value={providerItem}>
               {children}
            </apiContext.Provider>
        </div>
    )
}
