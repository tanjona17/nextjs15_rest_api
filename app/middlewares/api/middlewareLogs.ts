// function to see the requested method and url
export function middlewareLogs(req: Request) {
    return {response: req.method + " " + req.url};
}