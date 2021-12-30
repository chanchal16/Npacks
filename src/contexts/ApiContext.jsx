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


    /****function to fetch packages info */
    const fetchPackages = useCallback(async (topic) => {
      const queryString = "text=" + topic + "&size=12";
      await axios
        .get(url + queryString)
        .then((res) => {
          setFetchedPackages(res.data.objects);
          console.log("response", res.data.objects);
          console.log("fetchedpackages", fetchedPackages);
        })
        .catch((err) => {
          console.log(err);
        });
        getDownloads();
    }, []);

    const packs = fetchedPackages.map((p) => p.package.name);
  // console.log("names", packs);


    /*****function to get list of packages downloads */
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

  /******function to fetch repo info */
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
        getCommits(gitapi)
    },
    [],
  )

  /*****function to get commits of a package */
  const getCommits = async(api)=>{
    const apiText = "/stats/commit_activity";
    const commits_API = api.concat(apiText)
    await axios.get(commits_API, {
      headers: {
        Accept: "application/vnd.github.v3+json"
      }
    })
    .then((res)=>{
      console.log('commitsdata',res.data)
      setCommits(res.data)
      
    })
    .catch(err=>console.log(err))
  }

  /*****function to get downloads of a package */
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

    const providerItem = {fetchPackages,fetchRepos,getPackDownloads,fetchedRepo,fetchedPackages,
     downloadscount,weeklyDownloads,monthlyDownloads,commits };
    return (
        <div>
            <apiContext.Provider value={providerItem}>
               {children}
            </apiContext.Provider>
        </div>
    )
}
